import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import NewNote, {links as newNoteLinks} from "~/components/NewNote";
import NoteList, {links as noteListLinks} from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";

const NotesPage = () => {
    const notes = useLoaderData()
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
    return notes;
}

export async function action({request}) {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    // Add validation...

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updateNotes = [...existingNotes, noteData];
    await storeNotes(updateNotes);
    return redirect('/notes');
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()];
  }