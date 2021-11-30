import React, { useContext, useState } from 'react';
import SkillSlider from './SkillSlider';

const SelectSettings = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="mb-4">
            <form>
                <div className="row mb-3">
                    <SkillSlider label="Agility"/>
                </div>
                <div className="row mb-3">  
                    <SkillSlider label="Stealth"/>
                </div>
                <div className="row mb-3"> 
                    <SkillSlider label="Survivability"/>  
                </div>
                <div className="row mb-3"> 
                    <SkillSlider label="Magic"/>  
                </div>
                <div className="row mb-3"> 
                    <SkillSlider label="Signs"/>  
                </div>
                <button type="submit" onClick={e => handleSubmit(e)} className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default SelectSettings;
