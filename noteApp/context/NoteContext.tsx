import React, { createContext, useContext, useState } from "react"
import { Note } from '@/constants/notes.interface'

type NoteContextType = {
    notes: Note[]
    addNote: (data: Note) => void
    updateNote: (id: string, data: Partial<Note>) => void
    getNoteById: (id: string) => Note | undefined
    deleteNote: (id: string) => void
}

const NoteContext = createContext<NoteContextType | null>(null)

export function NoteProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([])

    const addNote = (data: Note) => {
        setNotes((prev) => [...prev, data])
    }

    const updateNote = (id: string, data: Partial<Note>) => {
        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...data } : n))
        )
    }

    const getNoteById = (id: string) => notes.find((n) => n.id === id)

    const deleteNote = (id: string) => setNotes(notes.filter((n) => n.id !== id))

    return(
        <NoteContext.Provider value={{notes, addNote, updateNote, getNoteById, deleteNote}}>
            {children}
        </NoteContext.Provider>
    )

}

export function useNote() {
    const ctx = useContext(NoteContext)
    if (!ctx){
        throw new Error("useNote must be used inside NoteProvider")
    }
    return ctx
}