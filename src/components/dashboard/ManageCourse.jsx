const ManageCourse = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);

  const fetchLectures = async () => {
    const { data } = await api.get(`/course/${id}`);
    setLectures(data.lectures);
  };

  const deleteLecture = async (lectureId) => {
    await api.delete(`/lecture/${lectureId}`);
    fetchLectures();
  };

  return (
    <div className="p-6">
      <Link to={`/admin/course/${id}/lecture/new`}
        className="bg-green-600 text-white px-4 py-2 rounded">
        + Add Lecture
      </Link>

      {lectures.map(l => (
        <div key={l._id} className="flex justify-between bg-white p-4 mt-4">
          <span>{l.title}</span>
          <button
            onClick={()=>deleteLecture(l._id)}
            className="text-red-600">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageCourse;