import { IoReload } from "@/utils/libs";

export function ErrorFeedback({ refreshFunction }: { refreshFunction: () => void }) {
	return (
		<div className="flex flex-col justify-center items-center gap-4 bg-fourth">
			<h1 className="text-white text-xl">
				Não foi possível carregar o conteúdo
			</h1>
			<IoReload
				className="w-1/2 h-1/2 text-white"
				onClick={refreshFunction}
			/>
		</div>
	)
}