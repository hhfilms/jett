"use client";

import React, {useState} from "react";
import {TextInput, Stack, Button} from "@sanity/ui";
import {set, PatchEvent} from "sanity";
import {StringInputProps, useFormValue} from "sanity";

const UrlWithMetadata: React.FC<StringInputProps> = ({value = "", onChange}) => {
  const [url, setUrlState] = useState(value);
  const [loading, setLoading] = useState(false);

  // Use the full document value
  const document = useFormValue([]) as {_id: string};

  const fetchMetadata = async () => {
    if (!url || !document?._id) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/scrape-metadata?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      await fetch("/api/patch-article-fields", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          _id: document._id,
          title: data.title,
          description: data.description,
          imageUrl: data.image,
        }),
      });
    } catch (err) {
      console.error("Metadata fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={3}>
      <TextInput
        value={url}
        onChange={(e) => {
          const newUrl = e.currentTarget.value;
          setUrlState(newUrl);
          onChange(PatchEvent.from(set(newUrl)));
        }}
        placeholder="Paste article URL"
      />
      <Button text={loading ? "Fetching..." : "Fetch Metadata"} disabled={!url || loading} onClick={fetchMetadata} />
    </Stack>
  );
};

export default UrlWithMetadata;
