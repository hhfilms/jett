export const BioNote = function () {
  return (
    <div style={{padding: "1rem", background: "#b33f3f", borderRadius: "4px", marginBottom: "1rem"}}>
      <strong>NOTE:</strong> &quot;Bio&quot; should only have one entry. If one already exists, edit/update it instead of creating a new one.
    </div>
  );
};

export const HudlNote = function () {
  return (
    <div style={{padding: "1rem", background: "#b33f3f", borderRadius: "4px", marginBottom: "1rem"}}>
      <strong>NOTE:</strong> In order to get the correct Hudl embed URL, go to the &quot;Highlight&quot; section of the Hudl Profile, click &quot;share&quot; on the highlight you want and copy the URL
      from there. Do not use the URL from the address bar.
    </div>
  );
};
