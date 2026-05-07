import { Button } from "@/Components/UI/Button";
import { Input } from "@/Components/UI/Input";
import { Select } from "@/Components/UI/Select";
import ToggleSwitch from "@/Components/UI/ToggleSwitch";
import { MdBadge, MdEmail, MdManageAccounts, MdSecurity } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";

interface StaffFormWidgetProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    roles: { id: string | number; value: string; label: string }[];
    processing: boolean;
    onSave: (e: React.FormEvent) => void;
    onClose: () => void;
}

export const StaffFormWidget: React.FC<StaffFormWidgetProps> = ({
    data,
    roles,
    setData,
    errors,
    processing,
    onSave,
    onClose,
}) => {
    return (
        <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Personal Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="e.g., Sarah Miller"
                        Icon={HiOutlineUser}
                        error={errors.name}
                        disabled={processing}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="smiller@kaykays.com"
                        Icon={MdEmail}
                        error={errors.email}
                        disabled={processing}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Role & Permissions
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        size="sm"
                        label="System Role"
                        value={data.roleType}
                        onChange={(value) => setData("roleType", value)}
                        options={roles}
                        placeholder="Select Role"
                        Icon={MdManageAccounts}
                        error={errors.roleType}
                        disabled={processing}
                    />
                    <Input
                        label="Job Title"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        placeholder="e.g., Senior Barista"
                        Icon={MdBadge}
                        error={errors.role}
                        disabled={processing}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Security
                </h4>
                <ToggleSwitch
                    label="Require Two-Factor Authentication"
                    onChange={(val) => setData("twoFactor", val)}
                    value={data.twoFactor}
                    size="sm"
                    icon={MdSecurity}
                    disabled={processing}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 sticky -bottom-6 bg-surface-container-lowest py-4 -mx-6 px-6 border-t border-outline-variant/10 mt-6">
                <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="flex-1"
                    disabled={processing}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    disabled={processing}
                    loading={processing}
                >
                    {data.id ? "Update Staff" : "Onboard Staff"}
                </Button>
            </div>
        </form>
    );
};