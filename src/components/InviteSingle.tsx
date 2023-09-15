const InviteSingle: React.FC<{
  id: string;
  name: string;
  photo: string;
}> = ({id,name, photo}) => {
  return (
    <>
      <div key={id}>
        <div>User {name} invited you to be friends</div>
        <img src={photo} alt="profile picture" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submitHandler(e);
          }}
        >
          <input name="id" type="hidden" value={id} />
          <button type="submit" onClick={clickAccpeptHandler}>
            accept
          </button>
          <button type="submit" onClick={clickDenieHandler}>
            decline
          </button>
        </form>
      </div>
    </>
  );
};

export default InviteSingle;
