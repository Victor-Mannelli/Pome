import { Dispatch, SetStateAction } from "react";
import { Button } from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { Navbar } from "../elements";

export function ErrorFeedback({ refreshFunction, loading, setFailed }: {
	setFailed: Dispatch<SetStateAction<boolean>>;
	refreshFunction: () => void;
	loading: boolean;
}) {
	return (
		<div className="flex flex-col justify-center items-center gap-4 bg-fourth h-screen">
			<Navbar />
			<h1 className="text-white text-xl text-center">
				The button below appeared because the API is likely offline.
				<br />
				Click it to reload the page in offline mode!
			</h1>
			<Button
				isLoading={loading}
				isDisabled={loading}
				className="w-fit h-1/3 text-white cursor-pointer"
				type='submit'
				onClick={() => {
					destroyCookie(null, 'token', { path: "/" });
					refreshFunction()
					setFailed(false)
				}}
			>
				Reload!
			</Button>
		</div >
	)
}