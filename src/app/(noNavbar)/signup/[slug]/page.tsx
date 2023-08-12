interface EmailSigninPageProps {
  params: {
    slug: string[];
  };
}

const SignUpPage = ({ params }: EmailSigninPageProps) => {
  const { slug } = params;
  console.log(typeof slug);

  // switch (slug) {
  //   case
  // }
  return <div>여기는 이제 사인업할 곳</div>;
};

export default SignUpPage;
