import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();

  const [form, setForm] = useState({ site: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);
const getPasswords=async()=>{
  let req= await fetch("http://localhost:3000/")
  let passwords = await req.json()
  console.log(passwords)
 setPasswordArray(passwords);

}
  useEffect(() => {
    getPasswords()
   
  }, []);

  const copyText = (text) => {
    toast('🦄 Wow Text Copied to Clipboard!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (ref.current.src.includes('icons/eyecross.png')) {
      ref.current.src = 'icons/eye.png';
      passwordref.current.type = 'text';
    } else {
      ref.current.src = 'icons/eyecross.png';
      passwordref.current.type = 'password';
    }
  };

  const savePassword = () => {
    if(form.site.length>3&& form.username.length>3&&form.password.length>3){
    const newData = { ...form, id: uuidv4() };
    const updatedArray = [...passwordArray, newData];
    setPasswordArray(updatedArray);
    let res=fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify(form)})
    setForm({ site: '', username: '', password: '' });
    toast('🦄 Wow password Saved Successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
  else{
    toast(" Error Password  not saved!")
  }
  };

  const deletePassword = (id) => {
    if (confirm('Are you sure to delete this saved password?')) {
      const updated = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updated);
      let res=fetch("http://localhost:3000/${id}",{method:"Delete", headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});

      // localStorage.setItem('passwords', JSON.stringify(updated));
      toast('🦄 Data deleted', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const editPassword = (id) => {
    const selected = passwordArray.find((item) => item.id === id);
    if (selected) {
      setForm({
        site: selected.site,
        username: selected.username,
        password: selected.password
      });
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-blue-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="mx-auto bg-blue-100 w-full max-w-6xl px-4">
        <div className="text-white flex flex-col p-4 items-center">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-slate-900">&lt; Password </span>
            <span className="text-green-600">Manager/&gt;</span>
          </h1>
          <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 text-black w-full p-4 py-1 bg-amber-50 mt-2"
            type="text"
            name="site"
          />

          <div className="flex flex-col md:flex-row w-full gap-4 mt-3 justify-center">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 text-black w-full p-4 py-0 bg-amber-50"
              type="text"
              name="username"
              required
            />
            <div className="relative w-full">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 text-black w-full p-4 py-0 bg-amber-50"
                type="password"
                name="password"
                required
              />
              <span
                className="absolute right-5 top-1/2 -translate-y-1/2 text-black cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} width={23} src="icons/eye.png" alt="" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-between items-center text-black bg-green-400 rounded-full gap-2 px-5 py-1 mt-4 w-fit hover:bg-green-300 border"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#121331,secondary:#3080e8"
            ></lord-icon>
            Save Password
          </button>

          <div className="passwords text-black w-full  mt-6">
            <h2 className="font-bold text-3xl py-4">Your Passwords</h2>
            {passwordArray.length === 0 ? (
              <div>No passwords to show</div>
            ) : (
              <div className="overflow-x-auto ">
                <table className="table-auto w-full rounded-md overflow-hidden min-w-[600px]">
                  <thead className="bg-green-800 text-white">
                    <tr>
                      <th className="py-2">Website</th>
                      <th className="py-2">Username</th>
                      <th className="py-2">Password</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-green-100">
                    {passwordArray.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center py-2">
                          <a href={item.site} target="_blank" rel="noreferrer">
                            {item.site}
                          </a>
                          <i
                            className="bi bi-clipboard-check-fill mx-2 cursor-pointer hover:invert bg-white"
                            onClick={() => copyText(item.site)}
                          ></i>
                        </td>
                        <td className="text-center py-2">
                          {item.username}
                          <i
                            className="bi bi-clipboard-check-fill mx-2 cursor-pointer hover:invert bg-white"
                            onClick={() => copyText(item.username)}
                          ></i>
                        </td>
                        <td className="text-center py-2">
                          {"*".repeat(item.password.length)}
                          <i
                            className="bi bi-clipboard-check-fill mx-2 cursor-pointer hover:invert bg-white"
                            onClick={() => copyText(item.password)}
                          ></i>
                        </td>
                        <td className="text-center py-2 flex justify-center gap-3">
                          <span onClick={() => editPassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#000000,secondary:#08a88a"
                              className="w-6"
                            ></lord-icon>
                          </span>
                          <span onClick={() => deletePassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/hwjcdycb.json"
                              trigger="hover"
                              stroke="bold"
                              colors="primary:#000000,secondary:#08a88a"
                              className="w-6"
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
