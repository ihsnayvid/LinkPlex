import React, { useState } from 'react';

function App() {
  const [boxes, setBoxes] = useState([]);
  const [newBoxTitle, setNewBoxTitle] = useState('');
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkURL, setNewLinkURL] = useState('');
  const [newBoxDescription, setNewBoxDescription] = useState('');

  const handleNewBoxTitleChange = (e) => {
    setNewBoxTitle(e.target.value);
  };

  const handleNewLinkNameChange = (e) => {
    setNewLinkName(e.target.value);
  };

  const handleNewLinkURLChange = (e) => {
    setNewLinkURL(e.target.value);
  };

  const handleNewBoxDescriptionChange = (e) => {
    setNewBoxDescription(e.target.value);
  };

  const handleAddBox = () => {
    const newBox = {
      title: newBoxTitle,
      links: [],
      description: newBoxDescription,
    };
    setBoxes([...boxes, newBox]);
    setNewBoxTitle('');
    setNewBoxDescription('');
    
  };

  const handleAddLink = (boxIndex) => {
    const newLink = {
      name: newLinkName,
      link: newLinkURL,
    };
    const updatedBoxes = [...boxes];
    updatedBoxes[boxIndex].links.push(newLink);
    setBoxes(updatedBoxes);
    setNewLinkName('');
    setNewLinkURL('');
  };

  const handleDeleteBox = (boxIndex) => {
    const updatedBoxes = [...boxes];
    updatedBoxes.splice(boxIndex, 1);
    setBoxes(updatedBoxes);
  };

  return (
    <div>
      <h1>Box App</h1>
      <div>
        <h2>Add Box</h2>
        <input type="text" placeholder="Title" value={newBoxTitle} onChange={handleNewBoxTitleChange} />
        <input type="text" placeholder="Description" value={newBoxDescription} onChange={handleNewBoxDescriptionChange} />
        <button onClick={handleAddBox}>Add Box</button>
      </div>
      {boxes.map((box, index) => (
        <div key={index}>
          <h3>{box.title}</h3>
          <p>{box.description}</p>
          <div>
            <h4>Links:</h4>
            {box.links.map((link, linkIndex) => (
              <button key={linkIndex}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
              </button>
            ))}
          </div>
          <div>
            <input type="text" placeholder="Name" value={newLinkName} onChange={handleNewLinkNameChange} />
            <input type="text" placeholder="URL" value={newLinkURL} onChange={handleNewLinkURLChange} />
            <button onClick={() => handleAddLink(index)}>Add Link</button>
          </div>
          <button onClick={() => handleDeleteBox(index)}>Delete Box</button>
        </div>
      ))}
    </div>
  );
}

export default App;