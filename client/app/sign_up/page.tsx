import AuthenticationView from "../views/auth";

export default function SignUpPage() {
	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen">
			<AuthenticationView signup={true} />
		</div>
	);
}
