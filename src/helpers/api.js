export async function fetchContractTypes() {
  console.log("testing123");
  const url = "http://localhost:5000/get_contract_types"; // Specify the full URL with the protocol

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contract types");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contract types:", error.message);
    return null;
  }
}

export async function create_solution(data) {
  console.log("testing123");
  const url = "http://localhost:5000/create_solution"; // Specify the full URL with the protocol

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // Convert data to JSON string
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create solution");
    }

    const responseData = await response.json(); // Parse response data
    return responseData;
  } catch (error) {
    console.error("Error creating solution:", error.message);
    return null;
  }
}

export async function get_instances() {
  console.log("testing");
  const url = "http://localhost:5000/get_instances"; // Specify the full URL with the protocol
  const data = {
    trigger_type: "list_active_automations",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // Convert data to JSON string
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create solution");
    }

    const responseData = await response.json(); // Parse response data
    return responseData;
  } catch (error) {
    console.error("Error creating solution:", error.message);
    return null;
  }
}

export async function delete_instance(id) {
  console.log("testing");
  const url = "http://localhost:5000/get_instances"; // Specify the full URL with the protocol
  const data = {
    trigger_type: "delete_an_automation",
    docId: id,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // Convert data to JSON string
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create solution");
    }

    const responseData = await response.json(); // Parse response data
    return responseData;
  } catch (error) {
    console.error("Error creating solution:", error.message);
    return null;
  }
}
