import React from "react";

const MembersTable = () => {
  const members = [
    {
      name: "George Lindelof",
      mobile: "+4 315 23 02",
      email: "carisen@armand.zo",
      status: "Active",
    },
    {
      name: "Eric Dyer",
      mobile: "+2 134 25 65",
      email: "cristolera.jm@love.zo",
      status: "Active",
    },
    {
      name: "Hakan Messaeni",
      mobile: "+1 345 22 21",
      email: "hakan@gmail.com",
      status: "Active",
    },
    {
      name: "Michael Campbell",
      mobile: "+1 750 52 73",
      email: "camp@normal.com",
      status: "Inactive",
    },
    {
      name: "Ashley Williams",
      mobile: "+1 905 43 11",
      email: "william.suh@nwol.com",
      status: "Active",
    },
    {
      name: "Venessa Paradi",
      mobile: "+4 644 12 38",
      email: "paradi.vim@google.com",
      status: "Active",
    },
    {
      name: "Lora Palmer",
      mobile: "+1 009 34 33",
      email: "lora.palm@gmail.com",
      status: "Active",
    },
    {
      name: "Christy Newborn",
      mobile: "+6 254 75 12",
      email: "christjamsaron.com",
      status: "Inactive",
    },
    {
      name: "Nick Jackel",
      mobile: "+4 608 43 12",
      email: "jackelf214@google.com",
      status: "Active",
    },
    {
      name: "Tora Laanderen",
      mobile: "+1 343 63 32",
      email: "tiraa.lwp@gmail.com",
      status: "Active",
    },
    {
      name: "Matisha Manis",
      mobile: "+5 234 23 00",
      email: "matisha@toliaal.com",
      status: "Active",
    },
  ];

  return (
    <div className="py-6">
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Add new</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">?</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-gray-400 hover:text-gray-600">
                      💬
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        💬
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        💬
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        💬
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersTable;