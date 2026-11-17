export default async function EditMeetingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
   
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-2xl font-bold text-slate-900">Edit Meeting {id}</h1>
        </main>
    );
}    

    