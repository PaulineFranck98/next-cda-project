import React from "react";
import { Theme } from "@prisma/client";

interface Props {
    themes: Theme[];
    selectedThemeIds: string[];
    onChange: (ids: string[]) => void;
}

const ThemeCheckboxGroup: React.FC<Props> = ({ themes, selectedThemeIds, onChange }) => {
    
    const handleToggle = (id: string) => {
        if(selectedThemeIds.includes(id)) {
            onChange(selectedThemeIds.filter(themeId => themeId !== id));
        } else {
            onChange([...selectedThemeIds, id]);
        }
    };

    return (
        <div>
            <label className="block mb-1 font-medium">Thèmes associés</label>
            <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => (
                    <label key={theme.id} className="flex items-center gap-2">
                        <input 
                            type="checkbox"
                            value={theme.id}
                            checked={selectedThemeIds.includes(theme.id)}
                            onChange={() => handleToggle(theme.id)} 
                            className="cursor-pointer accent-violet-700"
                        />
                        {theme.themeName}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ThemeCheckboxGroup;