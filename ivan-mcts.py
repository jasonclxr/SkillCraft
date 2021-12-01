
import math
from mcts_node import MCTSNode
from random import choice
from math import inf, sqrt, log

num_nodes = 1000
explore_faction = 2.

# to switch the player as to distinguish who is next
def switch_identity(identity):
    if(identity == 1):
        return 2
    else: # identity == 2
        return 1

def traverse_nodes(node, board, state, identity):
    """ Traverses the tree until the end criterion are met.

    Args:
        node:       A tree node from which the search is traversing.
        board:      The game setup.
        state:      The state of the game.
        identity:   The bot's identity, either 'red' or 'blue'.
                    Player Identity == 1, Enemy Identity == 2

    Returns:        A node from which the next stage of the search can proceed.

    """
    max_Child = node
    current_node = node

    # Calculating UCT for child nodes
    # Current = root_node. If root_node is a leaf node, it is selected.
    # Otherwise, calculate UCT for each of its child nodes. Choose the one with the largest UCT, and set it as current.
    # If current node is a leaf node, select it, otherwise calculate UCT for its child nodes...
    while not current_node.untried_actions and current_node.child_nodes:
        max_UCT = -inf
        for child in current_node.child_nodes.values():
            if(identity == board.current_player(state)):  # player's turn
                current_UCT = (child.wins / child.visits) + (explore_faction * sqrt(log(child.parent.visits) / child.visits))
            else: # enemy's turn
                current_UCT = ((1 - (child.wins / child.visits)) + (explore_faction * sqrt(log(child.parent.visits) / child.visits)))
            if(max_UCT < current_UCT):
                max_UCT = current_UCT
                max_Child = child
        current_node = max_Child
    return current_node


def expand_leaf(node, board, state):
    """ Adds a new leaf to the tree by creating a new child node for the given node.

    Args:
        node:   The node for which a child will be added.
        board:  The game setup.
        state:  The state of the game.

    Returns:    The added child node.

    """
    # Decide which of the untried actions we wish to proceed with
    new_Child_Parent_Actions = node.untried_actions[0]
    node.untried_actions.remove(new_Child_Parent_Actions)
    # Move to the board state that does that untried action
    state = board.next_state(state, new_Child_Parent_Actions)
    # create new MCTSNode to connect the parent and the legal actions
    new_Child = MCTSNode(parent=node, parent_action=new_Child_Parent_Actions, action_list=board.legal_actions(state))
    # Connect the new node as a child to its parent
    node.child_nodes[new_Child_Parent_Actions] = new_Child
    # return the added child
    return new_Child


def rollout(board, state):
    """ Given the state of the game, the rollout plays out the remainder randomly.
    Args:
        board:  The game setup.
        state:  The state of the game.
    """
    # While the game has not ended
    while board.is_ended(state) is False:
        # Play a random move, and set current state as if that random move was played
        # board.next_state(state, action) → returns a new state constructed by applying action in state.
        # From random_bot.py, return choice(board.legal_actions(state))
        flag = False
        for actions in board.legal_actions(state):
            simulated_state = board.next_state(state, actions)
            if(board.owned_boxes(state) != board.owned_boxes(simulated_state)):
                state = simulated_state
                flag = True
                break
        if(flag is False):
            state = board.next_state(state, choice(board.legal_actions(state)))

    # Once the game state is over, return the state 
    return state


def backpropagate(node, won):
    """ Navigates the tree from a leaf node to the root, updating the win and visit count of each node along the path.
    Args:
        node:   A leaf node.
        won:    An indicator of whether the bot won or lost the game.
    """
    # Update n & w of leaf node, then go to its parent node & update, and so forth until the root node is reached

    # While a node is not the root node (while it has a parent node), update its n & w
    # Have to update the parent node, then set current node, else the root node will not be updated
    if node is None:
        return
    else:
        # Update leaf node
        node.visits += 1
        # For w, 1 is a win, 0 is a draw, and -1 is a loss.
        # Have to look at how think uses backpropagate to ensure what "won" is
        node.wins += won
        backpropagate(node.parent, won)


def think(board, state):
    """ Performs MCTS by sampling games and calling the appropriate functions to construct the game tree.

    Args:
        board:  The game setup.
        state:  The state of the game.

    Returns:    The action to be taken.

    """
    identity_of_bot = board.current_player(state)
    root_node = MCTSNode(parent=None, parent_action=None, action_list=board.legal_actions(state))

    for step in range(num_nodes):
        # Copy the game for sampling a playthrough
        sampled_game = state

        # Start at root
        node = root_node

        # Do MCTS - This is all you!

        # Select the node w/ traverse_nodes
        node = traverse_nodes(node, board, sampled_game, identity_of_bot)
        # Use parent/child dictionaries to get actions to get from root node to selected node
        chosen_node = node
        chosen_actions = []
        while chosen_node.parent is not None:
            chosen_actions.insert(0, chosen_node.parent_action)
            chosen_node = chosen_node.parent
        for actions in chosen_actions:
            sampled_game = board.next_state(sampled_game, actions)

        if board.is_ended(sampled_game) is False:
            # Expand node with expand_leaf
            node = expand_leaf(node, board, sampled_game)

            # Update the sampled_game with the new state after expansion
            sampled_game = board.next_state(sampled_game, node.parent_action)

            # Simulate with rollout
            # Update the sampled_game with new state after rollout
            sampled_game = rollout(board, sampled_game)

            # backpropagate from simulated end node to root node
            backpropagate(node, board.points_values(sampled_game)[1])

    # Return an action, typically the most frequently used action (from the root) or the action with the best
    # estimated win rate.
    # Calculate winrate for each node in tree, storing the best win rate and action that corresponds to
    # that winrate, then return that action.
    if identity_of_bot == 1:
        identity_sign = 1
    else:
        identity_sign = -1
    max_winrate = 0
    action_to_do = list(root_node.child_nodes.keys())[0]
    # From https://realpython.com/iterate-through-dictionary-python/
    # According to mcts_nodes.py, Action -> MCTSNode dictionary of children
    for key, value in root_node.child_nodes.items():
        winrate = (value.wins / value.visits) * identity_sign
        if winrate > max_winrate:
            action_to_do = key
            max_winrate = winrate
    return action_to_do