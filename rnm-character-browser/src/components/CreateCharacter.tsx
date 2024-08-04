"use client";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "./Modal";

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($input: NewCharacterInput!) {
    createCharacter(input: $input) {
      id
      name
      status
      image
      species
      gender
      type
      origin {
        name
        type
      }
      location {
        name
        type
      }
    }
  }
`;

// https://robohash.org/
const generateRandomAvatar = () => {
  return `https://robohash.org/${Math.random().toString(36).substring(7)}.png`;
};

const speciesOptions = [
  "Human",
  "Alien",
  "Humanoid",
  "Poopybutthole",
  "Mythological Creature",
];
const statusOptions = ["Alive", "Dead", "Unknown"];
const genderOptions = ["Male", "Female", "Genderless", "Unknown"];
const typeOptions = [
  "Genetic Experiment",
  "Superhuman",
  "Parasite",
  "Robot",
  "Unknown",
];

const getRandomOption = (options: string[]) => {
  return options[Math.floor(Math.random() * options.length)];
};

const CreateCharacter = () => {
  const [createCharacter, { data, loading, error }] =
    useMutation(CREATE_CHARACTER);
  const [avatar, setAvatar] = useState(generateRandomAvatar());
  const [formValues, setFormValues] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
    type: "",
    originName: "",
    originType: "",
    locationName: "",
    locationType: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setAvatar(generateRandomAvatar());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const input = {
      name: formValues.name,
      status: formValues.status,
      image: avatar,
      species: formValues.species,
      gender: formValues.gender,
      type: formValues.type,
      origin: {
        name: formValues.originName,
        type: formValues.originType,
      },
      location: {
        name: formValues.locationName,
        type: formValues.locationType,
      },
      isCustom: true,
    };

    createCharacter({
      variables: { input },
    }).then(() => {
      setIsModalOpen(true);
    });
  };

  const handleRandomGenerate = () => {
    setFormValues({
      name: "Random Character",
      status: getRandomOption(statusOptions),
      species: getRandomOption(speciesOptions),
      gender: getRandomOption(genderOptions),
      type: getRandomOption(typeOptions),
      originName: "Random Origin",
      originType: "Random Type",
      locationName: "Random Location",
      locationType: "Random Type",
    });
    setAvatar(generateRandomAvatar());
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4">
      <div className="flex flex-col items-center relative md:self-start mb-4 md:mb-0 md:mr-20">
        <Image
          src={avatar}
          alt="Avatar"
          width={300}
          height={300}
          className="rounded-full mb-4 border-4 border-solid border-green-500"
          priority
        />
        <button
          type="button"
          onClick={() => setAvatar(generateRandomAvatar())}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline mb-4"
        >
          Generate Random Avatar
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-green-900 p-6 rounded-lg shadow-md"
      >
        {loading && <p className="text-yellow-300">Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="species"
          >
            Species
          </label>
          <select
            name="species"
            value={formValues.species}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Species</option>
            {speciesOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <select
            name="type"
            value={formValues.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Type</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="originName"
          >
            Origin Name
          </label>
          <input
            name="originName"
            value={formValues.originName}
            onChange={handleInputChange}
            placeholder="Origin Name"
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="originType"
          >
            Origin Type
          </label>
          <input
            name="originType"
            value={formValues.originType}
            onChange={handleInputChange}
            placeholder="Origin Type"
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="locationName"
          >
            Location Name
          </label>
          <input
            name="locationName"
            value={formValues.locationName}
            onChange={handleInputChange}
            placeholder="Location Name"
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-green-300 text-sm font-bold mb-2"
            htmlFor="locationType"
          >
            Location Type
          </label>
          <input
            name="locationType"
            value={formValues.locationType}
            onChange={handleInputChange}
            placeholder="Location Type"
            className="w-full px-3 py-2 leading-tight text-green-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRandomGenerate}
            className="px-4 py-2 mr-2 md:mr-6 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
          >
            Random
          </button>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Create Character
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          <h2 className="text-lg font-bold">Character Created Successfully!</h2>
          <p>ID: {data?.createCharacter.id}</p>
          <p>Name: {data?.createCharacter.name}</p>
          <p>Status: {data?.createCharacter.status}</p>
          <Image
            src={data?.createCharacter.image}
            alt={data?.createCharacter.name}
            width={100}
            height={100}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CreateCharacter;
