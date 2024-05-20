import { IoReload } from "@/utils/libs";

export function ErrorFeedback({ refreshFunction }: { refreshFunction: () => void }) {
	return (
		<div className="flex flex-col justify-center items-center gap-4 bg-fourth pt-16 h-screen">
			<h1 className="text-white text-xl">
				Não foi possível carregar o conteúdo
			</h1>
			<IoReload
				className="w-fit h-1/3 text-white cursor-pointer hover:brightness-75"
				onClick={refreshFunction}
			/>
		</div>
	)
}