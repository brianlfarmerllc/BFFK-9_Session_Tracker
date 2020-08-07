export default {
  // client information
  async addClient(client) {
    const res = await fetch("/api/client/", {
      method: "POST",
      body: JSON.stringify(client),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async deleteClient(clientId) {
    const res = await fetch("/api/client/" + clientId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async returnClients() {
    let res;
    try {
      res = await fetch("/api/client/");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json;
  },

  async updateClientInfo(clientId, clientInfo) {
    const res = await fetch("/api/client/" + clientId, {
      method: "PATCH",
      body: JSON.stringify(clientInfo),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  // pet information
  async addPet(pet) {
    const res = await fetch("/api/pet/", {
      method: "POST",
      body: JSON.stringify(pet),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async returnPets() {
    let res;
    try {
      res = await fetch("/api/pet/");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json;
  },

  async getClientPets(clientId) {
    let res;
    try {
      res = await fetch("/api/pet/" + clientId);
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json;
  },

  async updatePetInfo(petId, petInfo) {
    const res = await fetch("/api/pet/" + petId, {
      method: "PATCH",
      body: JSON.stringify(petInfo),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  // session information

  async newDay(dayData) {
    const res = await fetch("/api/session/", {
      method: "POST",
      body: JSON.stringify(dayData),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async getPetSessions() {
    let res;
    try {
      res = await fetch("/api/session/");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json;
  },

  async deleteDay(dayId) {
    const res = await fetch("/api/session/" + dayId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async getPetSessionsByPetId(PetId) {
    let res;
    try {
      res = await fetch("/api/session/" + PetId);
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json;
  },

  async sessionBlock(sessionId, sessionInfo) {
    const res = await fetch("/api/session/timeblock/" + sessionId, {
      method: "PATCH",
      body: JSON.stringify(sessionInfo),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async updateSessionBlock(blockId, sessionId, updateBlock) {
    const res = await fetch("/api/session/updateblock/" + sessionId + "/" + blockId, {
      method: "PATCH",
      body: JSON.stringify(updateBlock),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async deleteSessionBlock(blockId, sessionId,) {
    const res = await fetch("/api/session/deleteblock/" + sessionId + "/" + blockId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

  async submitNotes(daysNotes, sessionId) {
    const res = await fetch("/api/session/daysnotes/" + sessionId, {
      method: "PATCH",
      body: JSON.stringify(daysNotes),
      headers: { "Content-Type": "application/json" }
    });
    const json = await res.json();
    return json;
  },

}