
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "../../components/ui/table";
import { useToast } from "../../hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, UserPlus, Edit, Trash } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string;
  status: string;
}

const UserManagement = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [newUserPassword, setNewUserPassword] = useState("");
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users from the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Format the data for display
      const userData = data.map(profile => ({
        id: profile.id,
        email: profile.email || 'N/A',
        role: profile.role || 'user',
        created_at: new Date(profile.created_at).toLocaleDateString(),
        last_sign_in_at: 'N/A',
        status: 'Active'
      }));
      
      setUsers(userData);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddUserDialog = () => {
    setEditingUser(null);
    setNewUserEmail("");
    setNewUserRole("user");
    setNewUserPassword("");
    setDialogOpen(true);
  };
  
  const handleOpenEditUserDialog = (userData: UserData) => {
    setEditingUser(userData);
    setNewUserEmail(userData.email);
    setNewUserRole(userData.role);
    setNewUserPassword("");
    setDialogOpen(true);
  };
  
  const handleSaveUser = async () => {
    try {
      if (editingUser) {
        // Update existing user
        const { error } = await supabase
          .from('profiles')
          .update({ 
            email: newUserEmail,
            role: newUserRole,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingUser.id);
          
        if (error) throw error;
        
        toast({
          title: t("success"),
          description: t("userUpdated"),
        });
      } else {
        // Create new user
        // In a real application, you would use Supabase Auth to create a user
        // For this demo, we'll just create a profile entry
        const { error } = await supabase
          .from('profiles')
          .insert({ 
            email: newUserEmail,
            role: newUserRole
          });
          
        if (error) throw error;
        
        toast({
          title: t("success"),
          description: t("userCreated"),
        });
      }
      
      setDialogOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteClick = (userData: UserData) => {
    setUserToDelete(userData);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDelete.id);
        
      if (error) throw error;
      
      toast({
        title: t("success"),
        description: t("userDeleted"),
      });
      
      fetchUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="container-custom py-6">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{t("userManagement")}</CardTitle>
                  <CardDescription>{t("manageUsersAndPermissions")}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder={t("searchUsers")}
                      className="pl-8 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleOpenAddUserDialog}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("addUser")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-elbilia-blue" />
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("email")}</TableHead>
                        <TableHead>{t("role")}</TableHead>
                        <TableHead>{t("created")}</TableHead>
                        <TableHead>{t("status")}</TableHead>
                        <TableHead className="text-right">{t("actions")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((userData) => (
                          <TableRow key={userData.id}>
                            <TableCell className="font-medium">{userData.email}</TableCell>
                            <TableCell>
                              <span className="capitalize">{userData.role}</span>
                            </TableCell>
                            <TableCell>{userData.created_at}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  userData.status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {userData.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenEditUserDialog(userData)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                {t("edit")}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClick(userData)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                {t("delete")}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            {searchTerm ? t("noResultsFound") : t("noUsersAvailable")}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add/Edit User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser ? t("editUser") : t("addUser")}
            </DialogTitle>
            <DialogDescription>
              {editingUser 
                ? t("editUserDescription") 
                : t("addUserDescription")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">{t("role")}</Label>
              <select
                id="role"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="admin">{t("admin")}</option>
                <option value="editor">{t("editor")}</option>
                <option value="user">{t("user")}</option>
              </select>
            </div>
            
            {!editingUser && (
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleSaveUser}>
              {editingUser ? t("saveChanges") : t("addUser")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteUserConfirmation", { email: userToDelete?.email })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default UserManagement;
