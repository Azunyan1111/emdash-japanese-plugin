import type { CatalogEntry } from "./types.js";

import entries0 from "./admin/src/components/AdminCommandPalette.js";
import entries1 from "./admin/src/components/auth/PasskeyLogin.js";
import entries2 from "./admin/src/components/auth/PasskeyRegistration.js";
import entries3 from "./admin/src/components/BlockKitFieldWidget.js";
import entries4 from "./admin/src/components/CapabilityConsentDialog.js";
import entries5 from "./admin/src/components/comments/CommentDetail.js";
import entries6 from "./admin/src/components/comments/CommentInbox.js";
import entries7 from "./admin/src/components/ConfirmDialog.js";
import entries8 from "./admin/src/components/ContentEditor.js";
import entries9 from "./admin/src/components/ContentList.js";
import entries10 from "./admin/src/components/ContentPickerModal.js";
import entries11 from "./admin/src/components/ContentTypeEditor.js";
import entries12 from "./admin/src/components/ContentTypeList.js";
import entries13 from "./admin/src/components/Dashboard.js";
import entries14 from "./admin/src/components/DeviceAuthorizePage.js";
import entries15 from "./admin/src/components/DialogError.js";
import entries16 from "./admin/src/components/editor/BlockMenu.js";
import entries17 from "./admin/src/components/editor/DocumentOutline.js";
import entries18 from "./admin/src/components/editor/DragHandleWrapper.js";
import entries19 from "./admin/src/components/editor/ImageDetailPanel.js";
import entries20 from "./admin/src/components/editor/ImageNode.js";
import entries21 from "./admin/src/components/editor/MarkdownLinkExtension.js";
import entries22 from "./admin/src/components/editor/PluginBlockNode.js";
import entries23 from "./admin/src/components/FieldEditor.js";
import entries24 from "./admin/src/components/Header.js";
import entries25 from "./admin/src/components/LocaleSwitcher.js";
import entries26 from "./admin/src/components/LoginPage.js";
import entries27 from "./admin/src/components/MarketplaceBrowse.js";
import entries28 from "./admin/src/components/MarketplacePluginDetail.js";
import entries29 from "./admin/src/components/MediaDetailPanel.js";
import entries30 from "./admin/src/components/MediaLibrary.js";
import entries31 from "./admin/src/components/MediaPickerModal.js";
import entries32 from "./admin/src/components/MenuEditor.js";
import entries33 from "./admin/src/components/MenuList.js";
import entries34 from "./admin/src/components/PluginFieldErrorBoundary.js";
import entries35 from "./admin/src/components/PluginManager.js";
import entries36 from "./admin/src/components/PortableTextEditor.js";
import entries37 from "./admin/src/components/Redirects.js";
import entries38 from "./admin/src/components/RevisionHistory.js";
import entries39 from "./admin/src/components/SandboxedPluginPage.js";
import entries40 from "./admin/src/components/SandboxedPluginWidget.js";
import entries41 from "./admin/src/components/SaveButton.js";
import entries42 from "./admin/src/components/SectionEditor.js";
import entries43 from "./admin/src/components/SectionPickerModal.js";
import entries44 from "./admin/src/components/Sections.js";
import entries45 from "./admin/src/components/SeoPanel.js";
import entries46 from "./admin/src/components/Settings.js";
import entries47 from "./admin/src/components/settings/AllowedDomainsSettings.js";
import entries48 from "./admin/src/components/settings/ApiTokenSettings.js";
import entries49 from "./admin/src/components/settings/EmailSettings.js";
import entries50 from "./admin/src/components/settings/GeneralSettings.js";
import entries51 from "./admin/src/components/settings/PasskeyItem.js";
import entries52 from "./admin/src/components/settings/SecuritySettings.js";
import entries53 from "./admin/src/components/settings/SeoSettings.js";
import entries54 from "./admin/src/components/settings/SocialSettings.js";
import entries55 from "./admin/src/components/SetupWizard.js";
import entries56 from "./admin/src/components/Shell.js";
import entries57 from "./admin/src/components/Sidebar.js";
import entries58 from "./admin/src/components/SignupPage.js";
import entries59 from "./admin/src/components/TaxonomyManager.js";
import entries60 from "./admin/src/components/TaxonomySidebar.js";
import entries61 from "./admin/src/components/ThemeMarketplaceBrowse.js";
import entries62 from "./admin/src/components/ThemeMarketplaceDetail.js";
import entries63 from "./admin/src/components/ThemeProvider.js";
import entries64 from "./admin/src/components/ThemeToggle.js";
import entries65 from "./admin/src/components/users/InviteUserModal.js";
import entries66 from "./admin/src/components/users/RoleBadge.js";
import entries67 from "./admin/src/components/users/UserDetail.js";
import entries68 from "./admin/src/components/users/UserList.js";
import entries69 from "./admin/src/components/WelcomeModal.js";
import entries70 from "./admin/src/components/Widgets.js";
import entries71 from "./admin/src/components/WordPressImport.js";
import entries72 from "./admin/src/lib/api/api-tokens.js";
import entries73 from "./admin/src/lib/api/bylines.js";
import entries74 from "./admin/src/lib/api/client.js";
import entries75 from "./admin/src/lib/api/comments.js";
import entries76 from "./admin/src/lib/api/content.js";
import entries77 from "./admin/src/lib/api/current-user.js";
import entries78 from "./admin/src/lib/api/dashboard.js";
import entries79 from "./admin/src/lib/api/email-settings.js";
import entries80 from "./admin/src/lib/api/import.js";
import entries81 from "./admin/src/lib/api/marketplace.js";
import entries82 from "./admin/src/lib/api/media.js";
import entries83 from "./admin/src/lib/api/menus.js";
import entries84 from "./admin/src/lib/api/plugins.js";
import entries85 from "./admin/src/lib/api/redirects.js";
import entries86 from "./admin/src/lib/api/schema.js";
import entries87 from "./admin/src/lib/api/search.js";
import entries88 from "./admin/src/lib/api/sections.js";
import entries89 from "./admin/src/lib/api/settings.js";
import entries90 from "./admin/src/lib/api/taxonomies.js";
import entries91 from "./admin/src/lib/api/theme-marketplace.js";
import entries92 from "./admin/src/lib/api/users.js";
import entries93 from "./admin/src/lib/api/widgets.js";
import entries94 from "./admin/src/lib/media-utils.js";
import entries95 from "./admin/src/lib/url.js";
import entries96 from "./admin/src/lib/utils.js";
import entries97 from "./admin/src/router.js";
import entries98 from "./admin/src/routes/bylines.js";
import entries99 from "./admin/src/routes/users.js";
import entries100 from "./packages/core/src/astro/routes/admin.js";

export const adminTranslationCatalogByFile: Record<string, CatalogEntry[]> = {
	"admin/src/components/AdminCommandPalette.tsx": entries0,
	"admin/src/components/auth/PasskeyLogin.tsx": entries1,
	"admin/src/components/auth/PasskeyRegistration.tsx": entries2,
	"admin/src/components/BlockKitFieldWidget.tsx": entries3,
	"admin/src/components/CapabilityConsentDialog.tsx": entries4,
	"admin/src/components/comments/CommentDetail.tsx": entries5,
	"admin/src/components/comments/CommentInbox.tsx": entries6,
	"admin/src/components/ConfirmDialog.tsx": entries7,
	"admin/src/components/ContentEditor.tsx": entries8,
	"admin/src/components/ContentList.tsx": entries9,
	"admin/src/components/ContentPickerModal.tsx": entries10,
	"admin/src/components/ContentTypeEditor.tsx": entries11,
	"admin/src/components/ContentTypeList.tsx": entries12,
	"admin/src/components/Dashboard.tsx": entries13,
	"admin/src/components/DeviceAuthorizePage.tsx": entries14,
	"admin/src/components/DialogError.tsx": entries15,
	"admin/src/components/editor/BlockMenu.tsx": entries16,
	"admin/src/components/editor/DocumentOutline.tsx": entries17,
	"admin/src/components/editor/DragHandleWrapper.tsx": entries18,
	"admin/src/components/editor/ImageDetailPanel.tsx": entries19,
	"admin/src/components/editor/ImageNode.tsx": entries20,
	"admin/src/components/editor/MarkdownLinkExtension.tsx": entries21,
	"admin/src/components/editor/PluginBlockNode.tsx": entries22,
	"admin/src/components/FieldEditor.tsx": entries23,
	"admin/src/components/Header.tsx": entries24,
	"admin/src/components/LocaleSwitcher.tsx": entries25,
	"admin/src/components/LoginPage.tsx": entries26,
	"admin/src/components/MarketplaceBrowse.tsx": entries27,
	"admin/src/components/MarketplacePluginDetail.tsx": entries28,
	"admin/src/components/MediaDetailPanel.tsx": entries29,
	"admin/src/components/MediaLibrary.tsx": entries30,
	"admin/src/components/MediaPickerModal.tsx": entries31,
	"admin/src/components/MenuEditor.tsx": entries32,
	"admin/src/components/MenuList.tsx": entries33,
	"admin/src/components/PluginFieldErrorBoundary.tsx": entries34,
	"admin/src/components/PluginManager.tsx": entries35,
	"admin/src/components/PortableTextEditor.tsx": entries36,
	"admin/src/components/Redirects.tsx": entries37,
	"admin/src/components/RevisionHistory.tsx": entries38,
	"admin/src/components/SandboxedPluginPage.tsx": entries39,
	"admin/src/components/SandboxedPluginWidget.tsx": entries40,
	"admin/src/components/SaveButton.tsx": entries41,
	"admin/src/components/SectionEditor.tsx": entries42,
	"admin/src/components/SectionPickerModal.tsx": entries43,
	"admin/src/components/Sections.tsx": entries44,
	"admin/src/components/SeoPanel.tsx": entries45,
	"admin/src/components/Settings.tsx": entries46,
	"admin/src/components/settings/AllowedDomainsSettings.tsx": entries47,
	"admin/src/components/settings/ApiTokenSettings.tsx": entries48,
	"admin/src/components/settings/EmailSettings.tsx": entries49,
	"admin/src/components/settings/GeneralSettings.tsx": entries50,
	"admin/src/components/settings/PasskeyItem.tsx": entries51,
	"admin/src/components/settings/SecuritySettings.tsx": entries52,
	"admin/src/components/settings/SeoSettings.tsx": entries53,
	"admin/src/components/settings/SocialSettings.tsx": entries54,
	"admin/src/components/SetupWizard.tsx": entries55,
	"admin/src/components/Shell.tsx": entries56,
	"admin/src/components/Sidebar.tsx": entries57,
	"admin/src/components/SignupPage.tsx": entries58,
	"admin/src/components/TaxonomyManager.tsx": entries59,
	"admin/src/components/TaxonomySidebar.tsx": entries60,
	"admin/src/components/ThemeMarketplaceBrowse.tsx": entries61,
	"admin/src/components/ThemeMarketplaceDetail.tsx": entries62,
	"admin/src/components/ThemeProvider.tsx": entries63,
	"admin/src/components/ThemeToggle.tsx": entries64,
	"admin/src/components/users/InviteUserModal.tsx": entries65,
	"admin/src/components/users/RoleBadge.tsx": entries66,
	"admin/src/components/users/UserDetail.tsx": entries67,
	"admin/src/components/users/UserList.tsx": entries68,
	"admin/src/components/WelcomeModal.tsx": entries69,
	"admin/src/components/Widgets.tsx": entries70,
	"admin/src/components/WordPressImport.tsx": entries71,
	"admin/src/lib/api/api-tokens.ts": entries72,
	"admin/src/lib/api/bylines.ts": entries73,
	"admin/src/lib/api/client.ts": entries74,
	"admin/src/lib/api/comments.ts": entries75,
	"admin/src/lib/api/content.ts": entries76,
	"admin/src/lib/api/current-user.ts": entries77,
	"admin/src/lib/api/dashboard.ts": entries78,
	"admin/src/lib/api/email-settings.ts": entries79,
	"admin/src/lib/api/import.ts": entries80,
	"admin/src/lib/api/marketplace.ts": entries81,
	"admin/src/lib/api/media.ts": entries82,
	"admin/src/lib/api/menus.ts": entries83,
	"admin/src/lib/api/plugins.ts": entries84,
	"admin/src/lib/api/redirects.ts": entries85,
	"admin/src/lib/api/schema.ts": entries86,
	"admin/src/lib/api/search.ts": entries87,
	"admin/src/lib/api/sections.ts": entries88,
	"admin/src/lib/api/settings.ts": entries89,
	"admin/src/lib/api/taxonomies.ts": entries90,
	"admin/src/lib/api/theme-marketplace.ts": entries91,
	"admin/src/lib/api/users.ts": entries92,
	"admin/src/lib/api/widgets.ts": entries93,
	"admin/src/lib/media-utils.ts": entries94,
	"admin/src/lib/url.ts": entries95,
	"admin/src/lib/utils.ts": entries96,
	"admin/src/router.tsx": entries97,
	"admin/src/routes/bylines.tsx": entries98,
	"admin/src/routes/users.tsx": entries99,
	"packages/core/src/astro/routes/admin.astro": entries100,
};

export const adminTranslationCatalog: CatalogEntry[] = Object.values(adminTranslationCatalogByFile).flat();
