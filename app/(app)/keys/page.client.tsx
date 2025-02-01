"use client";

// UI
import { Button } from "@/ui/button";
import {
	Dialog,
	DialogActions,
	DialogBody,
	DialogDescription,
	DialogTitle,
} from "@/ui/dialog";
import { Input, InputGroup } from "@/ui/input";
import { Description, Field, FieldGroup, Fieldset, Label } from "@/ui/fieldset";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/table";
import { Code, Text } from "@/ui/text";
import { cn } from "@/utils/cn";

// Icons
import {
	ChatBubbleLeftIcon,
	ClipboardIcon,
	PlusIcon,
	TrashIcon,
} from "@heroicons/react/16/solid";

// React
import { useState, useCallback } from "react";

// Components
import { LoaderIcon } from "@/components/loading";

// Hooks
import { toast } from "sonner";
import { useClipboard } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

// Utils
import { format } from "date-fns";

// Types
import type { KeyData } from "@/utils/auth/keys";
import { Badge } from "@/ui/badge";

export function CreateKeyButton() {
	const [createdKey, setCreatedKey] = useState<string | undefined>(undefined);
	const [keyName, setKeyName] = useState("");
	const [open, setOpen] = useState(false);

	const clipboard = useClipboard({
		timeout: 2000,
	});

	const handleCreateDialogOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleCreateDialogClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleCreatedKeyDialogClose = useCallback(() => {
		setCreatedKey(undefined);
	}, []);

	const updateKeyName = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setKeyName(e.target.value);
		},
		[],
	);

	const handleCopyKey = useCallback(() => {
		clipboard.copy(createdKey);
		toast.success("Copied to clipboard!");
	}, [createdKey, clipboard]);

	const handleCreateKey = useCallback(async () => {
		async function createKey(name: string) {
			const response = await fetch("/api/keys", {
				method: "POST",
				body: JSON.stringify({ name }),
				credentials: "include",
			});

			const { data } = await response.json();

			setCreatedKey(data.key);
		}

		toast.promise(createKey(keyName), {
			loading: "Creating key...",
			success: "Key created!",
			error: "Failed to create key",
		});

		handleCreateDialogClose();
	}, [handleCreateDialogClose, keyName]);

	return (
		<>
			<Button color="dark/white" onClick={handleCreateDialogOpen}>
				<PlusIcon className="size-4" />
				Create Key
			</Button>
			<Dialog open={open} onClose={handleCreateDialogClose}>
				<DialogTitle>Create Key</DialogTitle>
				<DialogDescription>
					Create a new API key to use with the Community Notes API.
				</DialogDescription>
				<DialogBody>
					<Fieldset>
						<FieldGroup>
							<Field>
								<Label>Key Name</Label>
								<Description>
									Give your key a name so you can easily identify it.
								</Description>
								<InputGroup>
									<ChatBubbleLeftIcon className="size-4" />
									<Input value={keyName} onChange={updateKeyName} />
								</InputGroup>
							</Field>
						</FieldGroup>
					</Fieldset>
				</DialogBody>
				<DialogActions>
					<Button plain onClick={handleCreateDialogClose}>
						Cancel
					</Button>
					<Button onClick={handleCreateKey}>Create</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={!!createdKey} onClose={handleCreatedKeyDialogClose}>
				<DialogTitle>API Key Created!</DialogTitle>
				<DialogDescription>
					You can now authenticate your requests to the Community Notes API
					using this key.
				</DialogDescription>
				<DialogBody>
					<Fieldset>
						<Field>
							<Label>API Key</Label>
							<Description>
								Copy your API key and store it securely.
							</Description>
							<div className="flex flex-row items-center gap-2 mt-3">
								<Input defaultValue={createdKey} readOnly disabled />
								<Button
									plain
									onClick={handleCopyKey}
									className={cn(
										clipboard.copied &&
											"bg-emerald-500/5 hover:!bg-emerald-500/5 !border-emerald-500/20",
									)}
								>
									<ClipboardIcon
										className={cn("size-4", {
											"fill-emerald-500": clipboard.copied,
										})}
									/>
								</Button>
							</div>
						</Field>
					</Fieldset>
				</DialogBody>
				<DialogActions>
					<Button onClick={handleCreatedKeyDialogClose}>
						I‘ve saved my key and I want to close this dialog.
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export function KeysList() {
	const [revokingKeys, setRevokingKeys] = useState<string[]>([]);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["keys"],
		queryFn: () => fetch("/api/keys").then((res) => res.json()),
	});

	const handleRevokeKey = useCallback(
		async (id: string) => {
			setRevokingKeys((prev) => [...prev, id]);
			toast.promise(
				fetch("/api/keys", {
					method: "DELETE",
					body: JSON.stringify({ id }),
					credentials: "include",
				}),
				{
					loading: "Revoking key...",
					success: "Key revoked!",
					error: "Failed to revoke key",
				},
			);
			setRevokingKeys((prev) => prev.filter((key) => key !== id));
			await refetch();
		},
		[refetch],
	);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeader>Key ID</TableHeader>
					<TableHeader>Key Name</TableHeader>
					<TableHeader>Key Hint</TableHeader>
					<TableHeader>Created</TableHeader>
					<TableHeader>Last Used</TableHeader>
					<TableHeader>Status</TableHeader>
					<TableHeader>
						<span className="sr-only">Actions</span>
					</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{data?.keys?.map((key: KeyData) => (
					<TableRow key={key.id}>
						<TableCell>{key.id}</TableCell>
						<TableCell>{key.name}</TableCell>
						<TableCell>
							<Code>{key?.hint ?? "no hint"}</Code>
						</TableCell>
						<TableCell>{format(new Date(key.created), "PP")}</TableCell>
						<TableCell>{format(new Date(key.lastUsed), "PP")}</TableCell>
						<TableCell>
							{key.status === "active" ? (
								<Badge color="emerald">Active</Badge>
							) : (
								<Badge color="rose">Revoked</Badge>
							)}
						</TableCell>
						<TableCell>
							<Button
								outline
								disabled={
									key.status === "revoked" || revokingKeys.includes(key.id)
								}
								onClick={() => handleRevokeKey(key.id)}
							>
								<TrashIcon className="size-4" />
								{revokingKeys.includes(key.id) ? "Revoking..." : null}
								{key.status === "revoked" ? "Key Revoked" : "Revoke Key"}
							</Button>
						</TableCell>
					</TableRow>
				))}
				{isLoading ? (
					<TableRow>
						<TableCell colSpan={7}>
							<div className="flex justify-center items-center w-full">
								<LoaderIcon className="size-6" />
							</div>
						</TableCell>
					</TableRow>
				) : null}
				{error ? (
					<TableRow>
						<TableCell className="text-center" colSpan={7}>
							<Text>Failed to load.</Text>
						</TableCell>
					</TableRow>
				) : null}
				{!isLoading && !error && data?.keys?.length === 0 ? (
					<TableRow>
						<TableCell className="text-center" colSpan={7}>
							<Text>No keys found.</Text>
						</TableCell>
					</TableRow>
				) : null}
			</TableBody>
		</Table>
	);
}
