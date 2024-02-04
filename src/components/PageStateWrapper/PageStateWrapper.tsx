import PageError from "../PageError/PageError.tsx";
import PageLoader from "../PageLoader/PageLoader.tsx";

export interface PageStateWrapperProps{
    isLoading: boolean,
    isError?: boolean,
    errorMessage?: string,
    children: React.ReactNode
}
const PageStateWrapper = ({isLoading, isError, errorMessage, children}: PageStateWrapperProps) => {
    return (
        <>
            {isError ? <PageError errorMessage={errorMessage!}/> : isLoading ? <PageLoader/> : children }
        </>
    );
};

export default PageStateWrapper;