// for developmente use
const API_BASE = 'http://localhost:8080'; 


/**
 * 
 * @returns {Promise<{ roomId: string }>}
 */
async function createRoom() {
    const res = await fetch(`${API_BASE}/rooms`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }
    }); 

    if(!res.ok) {
        // TODO: change with a custom Exception
        throw new Error('Failed to create room');
    }

    return res.json();
}

/**
 * 
 * @param {int} roomId 
 * @param {int} playerId 
 */
async function joinRoom(roomId, playerId) {
  const res = await fetch(`${API_BASE}/rooms/${roomId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ playerId })
  });

  if (!res.ok) {
    throw new Error('Failed to join room');
  }
}

export const api = {
  createRoom,
  joinRoom
};