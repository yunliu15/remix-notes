import { redirect, json, } from "@remix-run/node";
import { Link, 
    useLoaderData, 
    useRouteError,
    isRouteErrorResponse, } from "@remix-run/react";

import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

const NotesPage = () => {
    const notes = useLoaderData();
    console.log('notes page')
    return ( 
        <main>
            <NewNote />
            <NoteList notes={notes} />
        </main>
     );
}
 
export default NotesPage;

export async function loader() {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json(
          { message: 'Could not find any notes.' },
          {
            status: 404,
            statusText: 'Not Found',
          }
        );
    }
    return notes;
}

export async function action({request}) {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    // Add validation...
    if(noteData.title.trim().length < 5) {
        return {message: 'Invalid title: must be at least 5 characters long.'}
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updateNotes = [...existingNotes, noteData];
    await storeNotes(updateNotes);
    //await new Promise((resolve,reject)=>setTimeout(()=>resolve(), 2000));
    return redirect('/notes');
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
  }

  export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      return (
        
        <main >
            <NewNote />
            <div className="info-message">
              <p>{error.data.message}</p>
            </div>            
        </main>
      );
    }
  
    let errorMessage = "Unknown error";
    if (error) {
      errorMessage = error.message;
    }
    return (
        <main className="error">
        <h1>An error occurred!</h1>
        <p>{errorMessage}</p>
        <p>
          Back to <Link to='/' >home</Link>
        </p>
      </main>
    )
  }