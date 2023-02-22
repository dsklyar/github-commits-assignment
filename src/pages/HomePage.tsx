import tw, { styled } from "twin.macro";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "components";
import { useState } from "react";

const Form = styled.form`
  ${tw`flex flex-col w-full md:w-[400px] md:h-[200px]`}
`;
const Input = styled.input`
  ${tw`outline-none h-8 p-1 mb-4`}
`;

const Submit = styled.button`
  ${tw`
		rounded
		text-white
		px-6 py-2.5
		bg-primary
		md:self-end
		outline-none
		shadow-sm
		disabled:shadow-none
		disabled:opacity-60
		disabled:cursor-not-allowed

		not-disabled:active:shadow-none
		not-disabled:hover:shadow-md
		not-disabled:hover:opacity-80


	`}
`;

interface FormElements extends HTMLFormControlsCollection {
  owner: HTMLInputElement;
  repository: HTMLInputElement;
}

interface RepositoryForm extends HTMLFormElement {
  readonly elements: FormElements;
}

interface IFormProps {
  owner: string;
  repository: string;
}

function HomePage() {
  // Initial Setup
  const [formData, setFormData] = useState<IFormProps>({
    owner: "",
    repository: "",
  });
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<RepositoryForm>) => {
    e.preventDefault();
    const {
      owner: { value: ownerValue },
      repository: { value: repositoryValue },
    } = e.currentTarget.elements;
    navigate(`/${ownerValue}/${repositoryValue}`);
  };

  const onChange = (e: React.FormEvent<RepositoryForm>) => {
    const {
      owner: { value: ownerValue },
      repository: { value: repositoryValue },
    } = e.currentTarget.elements;
    setFormData({ owner: ownerValue, repository: repositoryValue });
  };

  const disabled = !formData.owner || !formData.repository

  return (
    <PageLayout centered>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Input type="text" id="owner" placeholder="User/Organization" />
        <Input type="text" id="repository" placeholder="Repository" />
        <Submit type="submit" disabled={disabled}>Submit</Submit>
      </Form>
    </PageLayout>
  );
}

export default HomePage;
