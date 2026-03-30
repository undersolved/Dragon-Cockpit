const BASE_URL = "https://dragonball-api.com/api";

export const getCharacters = async (page = 1, limit = 20) => {
  const response = await fetch(
    `${BASE_URL}/characters?page=${page}&limit=${limit}`,
  );
  return await response.json();
};

export const searchCharacters = async (name) => {
  const response = await fetch(`${BASE_URL}/characters?name=${name}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const getCharacterById = async (id) => {
  const response = await fetch(`${BASE_URL}/characters/${id}`);
  return await response.json();
};

export const getPlanets = async (page = 1, limit = 20) => {
  const response = await fetch(
    `${BASE_URL}/planets?page=${page}&limit=${limit}`,
  );
  return await response.json();
};

export const getCharactersByRace = async (race) => {
  const response = await fetch(`${BASE_URL}/characters?race=${race}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

// Add this to your src/api/dragonball.js
// ... existing functions ...

// Replace your old getCharactersByPlanet with this:
export const getCharactersByPlanetId = async (planetId) => {
  try {
    // We hit the specific planet endpoint
    const response = await fetch(`${BASE_URL}/planets/${planetId}`);
    const data = await response.json();
    
    // This API returns a planet object; we only need the characters array inside it
    return Array.isArray(data.characters) ? data.characters : [];
  } catch (error) {
    console.error(`Error fetching residents for planet ID ${planetId}:`, error);
    return [];
  }
};