import { useState } from "react";

const SkillsSection = () => {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    // Prevent duplicates
    if (skills.includes(trimmed)) return;

    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <section className="flex flex-col gap-4 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">Skills</h1>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g. React, Node.js)"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Skills List */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-gray-600 hover:text-red-600 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No skills added yet. Start adding your skills.
        </p>
      )}
    </section>
  );
};

export default SkillsSection;
