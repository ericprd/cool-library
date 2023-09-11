import { usePersistentState } from "@/src/hooks/usePersistentState";

export default function Bookmarked() {
  const { state: bookmarkedList } = usePersistentState(null, 'bookmark');

  return (
    <></>
  );
}
