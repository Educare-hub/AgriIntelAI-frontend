import api from "./api";

export interface RegisterData {
  email?: string;
  phone: string;
  password: string;
  role?: string;
}

export interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}

function readMockUsers(): RegisterData[] {
  try {
    const raw = localStorage.getItem("mock_users");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeMockUsers(users: RegisterData[]) {
  localStorage.setItem("mock_users", JSON.stringify(users));
}


export const registerUser = async (data: RegisterData) => {
  try {
    await api.post("/analyze", {
      farmName: data.phone || data.email || "new-user",
      data: JSON.stringify({ registerData: data }),
    });
  } catch (err) {
    
    console.warn("Backend /analyze call failed (ok for mock register):", err);
  }

 
  const users = readMockUsers();

  users.push({ email: data.email, phone: data.phone, password: data.password, role: data.role });
  writeMockUsers(users);

  
  return {
    message: "Registered (mock).",
    user: { email: data.email, phone: data.phone, role: data.role || "farmer", token: "mock-token" },
  };
};


export const loginUser = async (data: LoginData) => {
  const users = readMockUsers();

  const identifier = (data.email || data.phone || "").toLowerCase();
  const found = users.find(
    (u) =>
      (u.phone && u.phone.toLowerCase() === identifier) ||
      (u.email && u.email.toLowerCase() === identifier)
  );

  if (!found) {
    throw new Error("User not found (mock). Please register first.");
  }

  if (found.password !== data.password) {
    throw new Error("Invalid password (mock).");
  }

  return {
    message: "Login successful (mock).",
    token: "mock-token",
    user: {
      id: Date.now(),
      email: found.email,
      phone: found.phone,
      role: found.role || "farmer",
      token: "mock-token",
    },
  };
};
