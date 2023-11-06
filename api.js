export const api = {
  PEOPLE: ({ name, employment }) => {
    let url = 'http://localhost:4002/people';

    const params = [];

    if (name) params.push(`name_like=${name}`);
    if (employment && employment.length > 0) {
      const employmentParams = employment.map((value) => `employment=${value}`).join('&');

      params.push(employmentParams);
    }

    if (params.length > 0) url += `?${params.join('&')}`;

    return url;
  },
};
