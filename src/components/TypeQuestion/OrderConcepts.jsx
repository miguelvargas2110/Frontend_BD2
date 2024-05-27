import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const OrderConcepts = (isExam) => {
  const [concepts, setConcepts] = useState([
    { id: '1', text: "Concepto 1" },
    { id: '2', text: "Concepto 2" },
    { id: '3', text: "Concepto 3" },
    { id: '4', text: "Concepto 4" },
  ]);

  const addConcept = () => {
    const newConcept = { id: (concepts.length + 1).toString(), text: `Concepto ${concepts.length + 1}` };
    setConcepts([...concepts, newConcept]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedConcepts = Array.from(concepts);
    const [movedConcept] = updatedConcepts.splice(result.source.index, 1);
    updatedConcepts.splice(result.destination.index, 1, movedConcept);

    setConcepts(updatedConcepts);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="concepts">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {concepts.map((concept, index) => (
                <Draggable key={concept.id} draggableId={concept.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2 p-2 border border-gray-300 bg-white rounded shadow-sm"
                    >
                      {concept.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={addConcept}
        className={`text-indigo-500 hover:underline mt-4 ${isExam ? 'hidden' : ''}`}
      >
        Agregar otro concepto
      </button>
    </div>
  );
};

export default OrderConcepts;
