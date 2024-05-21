import { Button } from "@chakra-ui/react"
import { useState } from "react";

export function ErrorFeedback({ refreshFunction }: { refreshFunction: () => void }) {
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<div className="flex flex-col justify-center items-center gap-4 bg-fourth pt-16 h-screen">
			<h1 className="text-white text-xl">
				There was an error loading the page.
			</h1>
			<Button
				isLoading={loading}
				isDisabled={loading}
				position={"absolute"}
				className="w-fit h-1/3 text-white cursor-pointer hover:brightness-75"
				type='submit'
				onClick={() => {
					setLoading(true)
					refreshFunction()
				}}
			>
				Reload!
			</Button>
		</div>
	)
}