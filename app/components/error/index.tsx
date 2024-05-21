import { Button } from "@chakra-ui/react"

export function ErrorFeedback({ refreshFunction, loading }: {
	refreshFunction: () => void,
	loading: boolean,
}) {
	return (
		<div className="flex flex-col justify-center items-center gap-4 bg-fourth pt-16 h-screen">
			<h1 className="text-white text-xl text-center">
				The api is probably offline <br/> but you can try again bellow
			</h1>
			<Button
				isLoading={loading}
				isDisabled={loading}
				className="w-fit h-1/3 text-white cursor-pointer hover:brightness-75"
				type='submit'
				onClick={() => {
					refreshFunction()
				}}
			>
				Reload!
			</Button>
		</div >
	)
}