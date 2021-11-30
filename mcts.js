// Note: might want to consider max win rates of children nodes
import tree from './skills.ts'

num_nodes = 1000
explore_factor = 2
console.log(tree.skills);

function main() {
    
}

// Traverse graph using UCT function until leaf node is reached
function traverse_nodes() {

}

// Adds a new leaf to the tree by creating a new child node for the given node.
// Constraints: Must have enough skill points in tree to reach row
function expand_leaf() {

}

// Selects random skills until points are depleted
function rollout() {
    while(tree.points_remaining > 0) {
        let skill_index = Math.floor(Math.random() * tree.skills.length);
        if (tree.skills[skill_index].is_legal()) {
            tree.skills[skill_index].points += 1;
            tree.points_remaining -= 1;
        }
    }
    return tree;
}

// Propagate result back through the graph
function backpropagate() {
    
}

// Performs MCTS by sampling games and returns the action
function think() {

}
