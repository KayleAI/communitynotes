"use client";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Divider } from "@/ui/divider";
import { Subheading } from "@/ui/heading";
import { Input } from "@/ui/input";
import { PageSubHeading } from "@/ui/page-heading";
import { Text } from "@/ui/text";
import { authClient } from "@/utils/auth/client";
import { useAuth } from "@/utils/auth/provider";
import { saveAvatar } from "@/utils/storage/save-avatar";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export default function SettingsClient() {
	const { user, update } = useAuth();

	const [name, setName] = useState(user?.name);
	const [avatar, setAvatar] = useState<string | File | null>(
		user?.avatar ?? null,
	);

	const updatePersonalInfo = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const changes: {
				image: string | null | undefined;
				name: string | undefined;
			} = {
				image: null,
				name: undefined,
			};

			// if avatar has changed, save it
			if (avatar instanceof File) {
				const imageUrl = await saveAvatar(avatar, user?.id);
				if (!imageUrl) return;
				changes.image = imageUrl;
			}

			// if name has changed, update it
			if (name !== user?.name) {
				changes.name = name;
			}

			const { error } = await authClient.updateUser(changes);

			if (error) {
				toast.error("Failed to update your profile. Please try again.");
				return;
			}

			await update();

			toast.success("Your profile has been updated!");
		},
		[update, avatar, name, user?.id, user?.name],
	);

	const handleReset = useCallback(() => {
		setName(user?.name);
		setAvatar(user?.avatar);
	}, [user?.name, user?.avatar]);

	return (
		<div className="flex flex-col gap-6 mt-6">
			<PageSubHeading
				title="Personal Information"
				description="These are the things about you."
			/>

			<main className="mb-20">
				<form
					id="personal"
					className="flex flex-col gap-6 px-2"
					onSubmit={updatePersonalInfo}
				>
					<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
						<div className="space-y-1">
							<Subheading level={3}>Name</Subheading>
							<Text>What should we call you?</Text>
						</div>
						<div>
							<Input
								aria-label="Name"
								name="name"
								defaultValue={user?.name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>

					<Divider soft />

					<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
						<div className="space-y-1">
							<Subheading level={3}>Email</Subheading>
							<Text>How can we send you important updates?</Text>
						</div>
						<div className="space-y-4">
							<Input
								type="email"
								aria-label="Email"
								name="email"
								defaultValue={user?.email ?? ""}
								disabled
							/>
						</div>
					</div>

					<Divider soft />

					<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
						<div className="space-y-1">
							<Subheading level={3}>Profile Picture</Subheading>
							<Text>
								This is the image that will be displayed on your profile.
							</Text>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<Avatar
									src={
										avatar instanceof File
											? URL.createObjectURL(avatar)
											: avatar
									}
									initials={!avatar ? "A" : undefined}
									alt="Profile preview"
									className="h-16 w-16 object-cover"
									square
								/>
								<div className="flex-1">
									<Input
										type="file"
										aria-label="Avatar"
										name="avatar"
										accept="image/*"
										className="w-full"
										onChange={async (e) => {
											const file = e.target.files?.[0];
											if (file) {
												setAvatar(file);
											}
										}}
									/>
									<Text className="mt-1 text-sm text-zinc-500">
										It may take up to 1 hour to update.
									</Text>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-4">
						<Button type="button" plain onClick={handleReset}>
							Reset
						</Button>
						<Button type="submit">Save changes</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
