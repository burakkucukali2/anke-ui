export async function getAllProjects(
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc"
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/projects?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  return {
    data,
  };
}

export async function getProjectById(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    data,
  };
}

export async function getProjectsByCategoryId(
  categoryId,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc"
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    data,
  };
}

export async function getAllCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    categories: data,
  };
}

export async function addNewProject(project) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/projects/add-new-project`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();

  return {
    data,
  };
}
