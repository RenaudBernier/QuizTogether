"use client";
import {Button} from "@/app/ui";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/app/firebase";
import {redirect} from "next/navigation";

export default function ButtonComponent({ id }){
    async function incrementQuestionNb() {
        await updateDoc(doc(db, "sessions", id), {
            currentQIndex: 0,
        });
        redirect('/Pages');
    }
    return(
        <Button onClick={incrementQuestionNb}>Ready</Button>
    )
}