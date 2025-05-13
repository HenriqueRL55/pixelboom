import { useState } from "react";
import { AddUserSheet } from "@/components/AddUser/addUser";
import type { UserInterface } from "@/types";
import { UserMetrics } from "../../components/UserMetrics/userMetrics";
import { SearchAndFilter } from "../../components/UserSearchBar/searchAndFilter";
import { UserListItem } from "../../components/UserCards/userListItem";
import { Pagination } from "../../components/Pagination/pagination";
import { initialUsers } from "../../data/mockUsers";

export default function UsersPage() {
  const [users, setUsers] = useState<UserInterface[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleAddUser = (newUser: Omit<UserInterface, "id">) => {
    const userWithId: UserInterface = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers([...users, userWithId]);
  };

  const handleEditUser = (updatedUser: UserInterface) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="p-[2.5rem] space-y-[1.25rem]">
      <div className="flex justify-between items-center">
        <h1 className="font-serif font-normal text-[1.875rem] leading-[2.25rem] tracking-tighter text-[#18181B]">
          Usuários
        </h1>
        <AddUserSheet onAddUser={handleAddUser} />
      </div>

      <UserMetrics
        totalUsers={users.length}
        activeUsers={users.filter((u) => u.status === "Ativo").length}
        inactiveUsers={users.filter((u) => u.status === "Inativo").length}
      />

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-[0.5rem] overflow-y-auto max-h-[23rem] pr-[0.5rem]">
        {currentUsers.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}