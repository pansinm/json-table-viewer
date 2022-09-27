import React, { FC, useState } from "react";
import { JSONTableViewer } from "../src/index";

const App = () => {
  const [json, setJson] = useState({});
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <textarea
        onChange={(e) => {
          try {
            setJson(JSON.parse(e.target.value));
          } catch (err) {}
        }}
      ></textarea>
      <JSONTableViewer border={1} json={json} />
    </div>
  );
};

export default App;
