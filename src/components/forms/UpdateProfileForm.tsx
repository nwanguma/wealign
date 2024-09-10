import { useState, FormEvent } from "react";
import Select, { MultiValue } from "react-select";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

interface Option {
  value: string;
  label: string;
}

interface SkillOption extends Option {}

interface LanguageOption extends Option {}

interface AvatarFile extends File {}

const UpdateProfileForm: React.FC = () => {
  const [bio, setBio] = useState<string>("");
  const [selectedLanguages, setSelectedLanguages] = useState<
    MultiValue<LanguageOption>
  >([]);
  const [selectedSkills, setSelectedSkills] = useState<MultiValue<SkillOption>>(
    []
  );
  const [visibilityStatus, setVisibilityStatus] = useState<
    "public" | "private"
  >("public");
  const [avatar, setAvatar] = useState<AvatarFile | null>(null);

  const languagesOptions: LanguageOption[] = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
  ];

  const skillsOptions: SkillOption[] = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
  ];

  const handleAvatarDrop = (acceptedFiles: AvatarFile[]) => {
    setAvatar(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleAvatarDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const profileData = {
      first_name: (e.target as any).first_name.value,
      last_name: (e.target as any).last_name.value,
      avatar,
      bio,
      location: (e.target as any).location.value,
      phone: (e.target as any).phone.value,
      website: (e.target as any).website.value,
      linkedin: (e.target as any).linkedin.value,
      github: (e.target as any).github.value,
      resume: (e.target as any).resume.value,
      visibilityStatus,
      languages: selectedLanguages.map((l) => l.value),
      skills: selectedSkills.map((s) => ({ title: s.label })),
    };

    console.log(profileData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="first_name"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Avatar</label>
        <div
          {...getRootProps()}
          className="mt-1 p-6 border-dashed border-2 rounded-md flex justify-center items-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {avatar ? (
            <p>{avatar.name}</p>
          ) : (
            <p>Drag and drop an image, or click to select an avatar</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Bio</label>
        <ReactQuill
          value={bio}
          onChange={setBio}
          className="mt-1"
          placeholder="Write a short bio"
          theme="snow"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="+1234567890"
          />
        </div>
        <div>
          <label className="block text-gray-700">Website</label>
          <input
            type="url"
            name="website"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        <div>
          <label className="block text-gray-700">GitHub</label>
          <input
            type="url"
            name="github"
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Resume (PDF)</label>
        <input
          type="url"
          name="resume"
          className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/resume.pdf"
        />
      </div>

      <div>
        <label className="block text-gray-700">Profile Visibility</label>
        <div className="flex items-center space-x-4 mt-1">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibilityStatus"
              value="public"
              checked={visibilityStatus === "public"}
              onChange={() => setVisibilityStatus("public")}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Public</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibilityStatus"
              value="private"
              checked={visibilityStatus === "private"}
              onChange={() => setVisibilityStatus("private")}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Private</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-gray-700">Languages</label>
        <Select
          isMulti
          options={languagesOptions}
          value={selectedLanguages}
          onChange={setSelectedLanguages}
          className="mt-1"
          placeholder="Select languages"
        />
      </div>

      <div>
        <label className="block text-gray-700">Skills</label>
        <Select
          isMulti
          options={skillsOptions}
          value={selectedSkills}
          onChange={setSelectedSkills}
          className="mt-1"
          placeholder="Select skills"
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;
