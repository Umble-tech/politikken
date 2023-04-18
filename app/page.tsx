"use client";
import { useState } from "react";
import { SearchField } from "@/components/SearchField";
import { PartyAnswer } from "@/components/PartyAnswer";
import { parties } from "@/parties";

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<{ [party: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const ask = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        setLoading(false);
      });
  };

  return (
    <main className="w-screen h-screen bg-gray-50 p-8">
      <form onSubmit={ask} className="w-full pt-32">
        <SearchField query={query} setQuery={setQuery} />
        {loading && (
          <p className="text-center mt-2 text-sm text-gray-600">
            Henter informasjon...
          </p>
        )}
      </form>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,_1fr))] gap-4 mt-16">
        {Object.keys(parties).map((party) => {
          return (
            <PartyAnswer
              key={party}
              party={party}
              text={response[party] || ""}
            />
          );
        })}
      </div>
    </main>
  );
}
