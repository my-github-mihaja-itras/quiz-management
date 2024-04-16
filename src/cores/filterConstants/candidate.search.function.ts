import { CandidateType } from "@/services/candidate/candidate-models";


export const userSearchFunction = (
  candidate: CandidateType[],
  searchTerm: string
): CandidateType[] => {
  const filteredData = candidate.filter((candidate) => {
    const firstNameMatch = candidate?.user?.firstname
      .toLowerCase()
      .includes(searchTerm);
    const lastNameMatch = candidate?.user?.lastname
      .toLowerCase()
      .includes(searchTerm);
    const usernameMatch = candidate?.user?.username
      .toLowerCase()
      .includes(searchTerm);
    const startDateMatch = candidate.createdAt
      .toLowerCase()
      .includes(searchTerm);
    const updatedDateMatch = candidate.updatedAt
      .toLowerCase()
      .includes(searchTerm);
    const statutsMatch = candidate.applicationStatus
      .toLowerCase()
      .includes(searchTerm);
    return (
      firstNameMatch ||
      lastNameMatch ||
      usernameMatch ||
      startDateMatch ||
      updatedDateMatch ||
      statutsMatch
    );
  });
  return filteredData;
};
