import PageError from "../PageError/PageError.tsx";
import PageLoader from "../PageLoader/PageLoader.tsx";

export interface PageStateWrapperProps{
    isLoading: boolean,
    isError?: boolean,
    errorMessage?: string,
    onErrorAction?: 'reload' | 'navigateBack'
    children: React.ReactNode
}
const PageStateWrapper = ({isLoading, isError, onErrorAction, errorMessage, children}: PageStateWrapperProps) => {
    return (
        <>
            {isError ? <PageError onErrorAction={onErrorAction!} errorMessage={errorMessage!}/> : isLoading ? <PageLoader/> : children }
        </>
    );
};

export default PageStateWrapper;