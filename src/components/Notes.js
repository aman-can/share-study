import NotesTeacher from "../pages/NotesTeacher";
import NotesStudent from "../pages/NotesStudent";
import useRole from "../hooks/useRole";
import { Backdrop, CircularProgress } from "@mui/material";
function Notes() {
    const role = useRole();

    if (role === "teacher") {
        return <NotesTeacher />;
    } else if (role === "student") {
        return <NotesStudent />;
    } else {
        return (
            <Backdrop
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}
export default Notes;
