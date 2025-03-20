import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

const AddNewAdminPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Admin</h1>
      <div className="max-w-md space-y-4">
        <Input placeholder="Email address" type="email" />
        <Input placeholder="Full Name" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Create Admin Account</Button>
      </div>
    </div>
  )
}

export default AddNewAdminPage