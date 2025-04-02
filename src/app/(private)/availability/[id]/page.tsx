import Availability from "./_components/availability"
/*
= card component that holds availability information
- add / delete button
*/

export default async function AvailabilityPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params

    return (
        <div className="bg-lightBlue">
            <Availability
              id={id}
            />
        </div>
    )
}