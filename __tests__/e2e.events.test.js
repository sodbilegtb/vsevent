const BASE_URL = 'http://localhost:3000/api/events';

describe('E2E: /api/events REST API', () => {
  let createdId;

  // Create event (POST)
  it('POST /api/events → should create a new event', async () => {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Event',
        category: 'TestCategory',
        date: new Date().toISOString(),
        location: 'Test Location',
        description: 'Test Description',
      }),
    });
    const data = await res.json();
    console.log('POST response:', data);

    expect(res.status).toBe(201);
    expect(data).toHaveProperty('_id');
    expect(data.title).toBe('Test Event');

    createdId = data._id;
  });

  // Read event (GET)
  it('GET /api/events/[id] → should fetch the created event', async () => {
    expect(createdId).toBeDefined();

    const res = await fetch(`${BASE_URL}/${createdId}`);
    const data = await res.json();
    console.log('GET response:', data);

    expect(res.status).toBe(200);
    expect(data._id).toBe(createdId);
    expect(data.title).toBe('Test Event');
  });

  // Update event (PATCH)
  it('PATCH /api/events/[id] → should update the event title', async () => {
    expect(createdId).toBeDefined();

    const updatedTitle = 'Updated Test Event';

    const res = await fetch(`${BASE_URL}/${createdId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: updatedTitle }),
    });

    const data = await res.json();
    console.log('PATCH response:', data);

    expect(res.status).toBe(200);
    expect(data._id).toBe(createdId);
    expect(data.title).toBe(updatedTitle);
  });

  // Delete event (DELETE)
  it('DELETE /api/events/[id] → should delete the event', async () => {
    expect(createdId).toBeDefined();

    const res = await fetch(`${BASE_URL}/${createdId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log('DELETE response:', data);

    expect(res.status).toBe(200);
    expect(data.message).toBe('Event deleted successfully');
  });

  // Confirm deletion (GET)
  it('GET /api/events/[id] after delete → should return 404', async () => {
    expect(createdId).toBeDefined();

    const res = await fetch(`${BASE_URL}/${createdId}`);
    const data = await res.json();
    console.log('GET after delete response:', data);

    expect(res.status).toBe(404);
    expect(data.error).toBe('Event not found');
  });
});
