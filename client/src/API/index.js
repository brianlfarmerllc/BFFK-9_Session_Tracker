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

    async returnClients() {
        let res;
        try {
          res = await fetch("/api/client");
        } catch (err) {
          console.log(err)
        }
        const json = await res.json();
        return json;
      },
}