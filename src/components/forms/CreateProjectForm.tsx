import { useState, FormEvent } from "react";
import Select, { MultiValue } from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

interface CollaboratorOption {
  value: string;
  label: string;
  role: string;
}

interface SkillOption {
  value: string;
  label: string;
}

interface CreateProjectFormProps {}

const CreateProjectForm: React.FC<CreateProjectFormProps> = () => {
  const [description, setDescription] = useState<string>("");
  const [selectedCollaborators, setSelectedCollaborators] = useState<
    MultiValue<CollaboratorOption>
  >([]);
  const [selectedSkills, setSelectedSkills] = useState<MultiValue<SkillOption>>(
    []
  );
  const [budget, setBudget] = useState<number | null>(null);
  const [deadline, setDeadline] = useState<string>("");

  const collaboratorsOptions: CollaboratorOption[] = [
    {
      value: "c2415009-3c52-4b0d-bb2d-c5cfbaf3c802",
      label: "John Doe",
      role: "Developer",
    },
    {
      value: "d5b02f88-1234-4b0d-b9f9-b4cfbaf3a123",
      label: "Jane Smith",
      role: "Designer",
    },
  ];

  const skillsOptions: SkillOption[] = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "React", label: "React" },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const projectData = {
      title: (e.target as any).title.value,
      description,
      website: (e.target as any).website.value,
      githubUrl: (e.target as any).githubUrl.value,
      budget,
      deadline,
      collaborators: selectedCollaborators.map((c) => ({
        id: c.value,
        name: c.label,
        role: c.role,
      })),
      skills: selectedSkills.map((s) => ({ title: s.label })),
    };
    console.log(projectData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <div>
        <label className="block text-gray-700">Project Title</label>
        <input
          type="text"
          name="title"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project title"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Project Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mt-1"
          placeholder="Describe the project"
          theme="snow"
        />
      </div>

      <div>
        <label className="block text-gray-700">Website URL</label>
        <input
          type="url"
          name="website"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-gray-700">GitHub URL</label>
        <input
          type="url"
          name="githubUrl"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="https://github.com/thenewproject"
        />
      </div>

      <div>
        <label className="block text-gray-700">Budget (USD)</label>
        <input
          type="number"
          name="budget"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter budget estimation"
          value={budget || ""}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-gray-700">Deadline</label>
        <input
          type="date"
          name="deadline"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700">Collaborators</label>
        <Select
          isMulti
          options={collaboratorsOptions}
          value={selectedCollaborators}
          onChange={setSelectedCollaborators}
          className="mt-1"
          placeholder="Select collaborators"
          getOptionLabel={(option) => `${option.label} - ${option.role}`}
        />
      </div>

      <div>
        <label className="block text-gray-700">Skills Required</label>
        <Select
          isMulti
          options={skillsOptions}
          value={selectedSkills}
          onChange={setSelectedSkills}
          className="mt-1"
          placeholder="Select required skills"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;
