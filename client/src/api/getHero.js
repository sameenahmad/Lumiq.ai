// const url = "https://instinctive-goofy-steel.glitch.me";

const url = "http://localhost:8000";

export default async function getHero(data) {
  try {
    const results = await fetch(`${url}/getHero`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resp = await results.json();
    return resp;
  } catch (err) {
    return err.message
  }
}
